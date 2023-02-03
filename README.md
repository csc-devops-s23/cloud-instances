# Cloud Instances

Before you start:

```bash
$ git clone https://github.com/csc-devops-s23/cloud-instances.git
$ cd cloud-instances
```

Install the dependencies:

```bash
$ npm install
```

Create a `.env` file in the root directory of this repo, and add yout DO_TOKEN in it like this:

```bash
DO_TOKEN=your_token
```


Run the app:

```bash
$ node index.js
```

## Install this cli app globally

```bash
$ npm link
```

## To run the cli app

```bash
$ cloud-instances --help
$ cloud-instances regions
```

## To uninstall the cli app

```bash
$ npm unlink -g cloud-instances
```
