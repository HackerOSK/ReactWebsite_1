from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
import requests
import json
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hardcoded credentials
# USERNAME = "sigmacoins91835"
# PASSWORD = "Parth#$2693"
USERNAME = "DAOMumbai"
PASSWORD = "DAOMumbai26"
API_KEY = "e4cfe50474msh3678b3dd360d14bp132c36jsn172ec647c633"
API_HOST = "twitter241.p.rapidapi.com"


def setup_driver():
    """Set up the Chrome WebDriver with appropriate options."""
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')
    options.add_argument('--disable-blink-features=AutomationControlled')
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver


def login_to_x(driver, username, password):
    """Login to X/Twitter."""
    try:
        driver.get("https://twitter.com/login")
        time.sleep(3)
        username_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[autocomplete="username"]'))
        )
        username_field.send_keys(username)
        username_field.send_keys(Keys.RETURN)
        time.sleep(2)
        password_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[name="password"]'))
        )
        password_field.send_keys(password)
        password_field.send_keys(Keys.RETURN)
        time.sleep(5)
        logger.info("Successfully logged in to X")
        return True
    except Exception as e:
        logger.error(f"Login failed: {str(e)}")
        return False


def scrape_x_search_userids(wallet_address, username, password, scroll_duration=30):
    """Scrapes X (Twitter) search results for a given wallet address and extracts user IDs."""
    driver = setup_driver()
    user_ids = set()
    try:
        if not login_to_x(driver, username, password):
            raise Exception("Failed to login to X")
        search_url = f"https://twitter.com/search?q={wallet_address}&src=typed_query&f=live"
        driver.get(search_url)
        time.sleep(5)
        logger.info("Starting to scrape user IDs")
        start_time = time.time()
        last_height = driver.execute_script("return document.body.scrollHeight")
        while time.time() - start_time < scroll_duration:
            try:
                posts = driver.find_elements(By.CSS_SELECTOR, 'article[data-testid="tweet"]')
                for post in posts:
                    try:
                        profile_link = post.find_element(By.CSS_SELECTOR, '[data-testid="User-Name"] a')
                        user_url = profile_link.get_attribute("href")
                        user_id = user_url.split("/")[-1]
                        if user_id:
                            user_ids.add(user_id)
                    except NoSuchElementException:
                        continue
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
                new_height = driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
            except Exception as e:
                logger.error(f"Error during scrolling: {str(e)}")
                continue
        logger.info(f"Scraped {len(user_ids)} unique user IDs")
        return list(user_ids)
    finally:
        driver.quit()


def fetch_user_details(user_ids, api_key, api_host):
    """Fetches details for each user ID using the API."""
    url = "https://twitter241.p.rapidapi.com/user"
    all_user_details = []
    headers = {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": api_host
    }
    for user_id in user_ids:
        querystring = {"username": user_id}
        try:
            response = requests.get(url, headers=headers, params=querystring)
            if response.status_code == 200:
                user_details = response.json()
                all_user_details.append(user_details)
                logger.info(f"Fetched details for user ID: {user_id}")
            else:
                logger.warning(f"Failed to fetch details for {user_id}: {response.status_code}")
        except Exception as e:
            logger.error(f"Error fetching details for {user_id}: {str(e)}")
    return all_user_details


def scrape_user_ids_and_fetch_details(wallet_address):
    """Run the scraping and fetching process."""
    try:
        user_ids = scrape_x_search_userids(wallet_address, USERNAME, PASSWORD)
        user_details = fetch_user_details(user_ids, API_KEY, API_HOST)
        return user_details
    except Exception as e:
        logger.error(f"Error in scraping process: {str(e)}")
        raise


@app.route('/fetch_details', methods=['POST'])
def fetch_details():
    """API endpoint to scrape and fetch user locations and their coordinates."""
    try:
        data = request.json
        wallet_address = data.get('wallet_address')
        if not wallet_address:
            return jsonify({"error": "Missing required parameter: wallet_address"}), 400

        # Scrape and fetch user details
        user_details = scrape_user_ids_and_fetch_details(wallet_address)

        # Extract locations and geocode them
        location_coordinates = []
        for user in user_details:
            try:
                # Extract location
                location = user['result']['data']['user']['result']['legacy']['location']

                if location:
                    # Geocode the location
                    geocode_url = f"https://geocode.maps.co/search"
                    params = {
                        'q': location,
                        'api_key': '675a578f99363442690002ufk010e8e'
                    }

                    # Make the API call
                    response = requests.get(geocode_url, params=params)

                    if response.status_code == 200:
                        geocode_data = response.json()

                        # Check if geocoding returned results
                        if geocode_data:
                            first_result = geocode_data[0]
                            location_info = {
                                'original_location': location,
                                'latitude': first_result.get('lat'),
                                'longitude': first_result.get('lon'),
                                'display_name': first_result.get('display_name')
                            }
                            location_coordinates.append(location_info)
                    else:
                        logger.warning(f"Geocoding failed for location: {location}")

            except (KeyError, TypeError, requests.RequestException) as e:
                logger.error(f"Error processing location: {str(e)}")
                continue

        return jsonify({"location_coordinates": location_coordinates}), 200

    except Exception as e:
        logger.error(f"Error in /fetch_details endpoint: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":  # Corrected __name__ check
    app.run(debug=True,port=8000)