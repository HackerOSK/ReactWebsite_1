import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const points = [];
    const velocity2 = 5; // velocity squared
    const radius = 5;
    const canvasWidth = 200;
    const canvasHeight = 200;
    const numberOfPoints = 30;

    // Set canvas size for smaller graph
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    function createPoint() {
      const point = {};
      point.x = Math.random() * canvas.width;
      point.y = Math.random() * canvas.height;
      point.vx = (Math.random() * 2 - 1) * Math.random();
      const vx2 = Math.pow(point.vx, 2);
      const vy2 = velocity2 - vx2;
      point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
      points.push(point);
    }

    function resetVelocity(point, axis, dir) {
      if (axis === "x") {
        point.vx = dir * Math.random();
        const vx2 = Math.pow(point.vx, 2);
        const vy2 = velocity2 - vx2;
        point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
      } else {
        point.vy = dir * Math.random();
        const vy2 = Math.pow(point.vy, 2);
        const vx2 = velocity2 - vy2;
        point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
      }
    }

    function drawCircle(x, y) {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = "#32CD32"; // Acid green
      context.shadowBlur = 15;
      context.shadowColor = "#00FF00"; // Green glow
      context.fill();
    }

    function drawLine(x1, y1, x2, y2) {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = "rgba(50, 205, 50, 0.7)"; // Acid green with transparency
      context.lineWidth = 2;
      context.stroke();
    }

    function draw() {
      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;
        drawCircle(point.x, point.y);
        const buddy = points[i === 0 ? points.length - 1 : i - 1];
        drawLine(point.x, point.y, buddy.x, buddy.y);

        if (point.x < 0 + radius) {
          resetVelocity(point, "x", 1);
        } else if (point.x > canvas.width - radius) {
          resetVelocity(point, "x", -1);
        } else if (point.y < 0 + radius) {
          resetVelocity(point, "y", 1);
        } else if (point.y > canvas.height - radius) {
          resetVelocity(point, "y", -1);
        }
      });
    }

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      draw();
      requestAnimationFrame(animate);
    }

    // Initialize points and animation
    for (let i = 0; i < numberOfPoints; i++) {
      createPoint();
    }
    points.forEach((point, i) => {
      point.buddy = i === 0 ? points[points.length - 1] : points[i - 1];
    });

    animate();

    // Navigate to the target page after 10 seconds
    const timeout = setTimeout(() => {
      navigate("/target");
    }, 10000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000000, #0d0d0d)", // Black gradient
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#32CD32", // Acid green text
      }}
    >
      <canvas
        ref={canvasRef}
        id="container"
        style={{
          background: "rgba(0, 0, 0, 0.9)", // Black background for canvas
          borderRadius: "10px",
          boxShadow: "0 0 20px 10px rgba(50, 205, 50, 0.5)", // Acid green glow
          marginBottom: "20px",
        }}
      />
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textShadow: "5px #32CD32, 5px #00FF00",
          animation: "fade 2s infinite",
        }}
      >
        🔗 Connecting the Dots 🔗
      </h1>
      <style>
        {`
          @keyframes fade {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
