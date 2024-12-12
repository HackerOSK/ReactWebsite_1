{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.python311
    pkgs.python311Packages.pip
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}




# # To learn more about how to use Nix to configure your environment
# # see: https://developers.google.com/idx/guides/customize-idx-env
# { pkgs, ... }: {
#   # Which nixpkgs channel to use.
#   channel = "stable-24.05"; # or "unstable"
#   # Use https://search.nixos.org/packages to find packages
#   packages = [
#     pkgs.nodejs_20
#     pkgs.python311
#     pkgs.python311Packages.pip
#   ];
#   # Sets environment variables in the workspace
#   env = {};
#   idx = {
#     # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
#     extensions = [
#       "ms-toolsai.jupyter"
#       "ms-python.python"
#     ];
#     workspace = {
#       # Runs when a workspace is first created with this `dev.nix` file
#       onCreate = {
#         create-venv = ''
#           python -m venv .venv
#           source .venv/bin/activate
#           pip install -r requirements.txt
#         '';
#       };
#       # To run something each time the environment is rebuilt, use the `onStart` hook
#     };
#     # Enable previews and customize configuration
    
#     previews = {
#       web = {
#         command = [
#           "npm"
#           "run"
#           "dev"
#           "--"
#           "--port"
#           "$PORT"
#           "--host"
#           "0.0.0.0"
#         ];
#         manager = "web";
#       };
#     };
  
# }