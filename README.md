# EIS-module-starter-kit
This is the starter kit for the EIS system backend. All eis backend modules should be used based on this project.

# Usage
1. Download the [EIS backend starter kit](https://www.npmjs.com/package/eis-module-core).
2. In the starter kit project, add any modules as you wish by running '`yarn add eis-module-xxx`'.
3. Install dependencies by running '`yarn install`'.
4. Run the starter kit project by running '`yarn start`'.

# Try
From browser try to access following addresses, you will get the response from the interfaces:
  - http://localhost:8000/demo
  - http://localhost:8000/demo/name
  - http://localhost:8000/demo/say
  - http://localhost:8000/demo/say/morning
  - http://localhost:8000/demo/bye
  - (POST) http://localhost:8000/demo/say/hello, with body {Name: 'some name'}
  - http://localhost:8000/demo/say/hello/author, you will get the author just created with above request.

# How this works
# Modules
# Global hooks
# Configuration
# Testing