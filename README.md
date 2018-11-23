


# Project structure
    .
    ├── dist                                      # Built
    ├── logs                                      # Logs file
    ├── node_modules                              # NodeJS dependencies
    ├── src                                       # Business code
    │   ├── app                                   # Server controller folder
    │   │   ├── config                            # Express middleware folder
    │   │   ├── middleware                        # Express middleware folder
    │   │   ├── router                            # Express middleware folder
    │   │   ├── schema                            # Express middleware folder
    │   │   │   ├── definitions                   # Express middleware folder
    │   │   ├── swagger                           # Express middleware folder
    │   ├── constant                              # Constant variable here
    │   │   ├── common                            # Constant variable here
    │   ├── handle                                # Business handlers
    │   │   ├── auth                              # Business handlers
    │   │   ├── ...                               # Business handlers
    │   ├── lib                                   # Common library
    │   │   ├── common                            # Common library
    │   │   ├── elasticsearch                     # Common library
    │   │   ├── helper                            # Common library
    │   ├── respository                           # Respository model
    ├── resource                                  # Application's resource
    ├── test                                      # Unit test at here
    ├── .dockerignore
    ├── .env
    ├── .gitignore
    ├── dockerfile
    ├── docker-compose.yml
    ├── package-lock.json
    ├── package.json
    ├── .babelrc
    └── README.md
