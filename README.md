# AWS EC2 Instance Control
## This is a Node.js script that allows you to control an EC2 instance on AWS. It uses the AWS SDK to interact with the EC2 API.

## Installation
To use this script, you must have Node.js installed on your system. You also need to have an AWS account and the AWS CLI installed.

- Clone this repository to your local machine.
- Install the AWS SDK for JavaScript by running `npm install aws-sdk`.
- Configure your AWS credentials using the AWS CLI by running `aws configure`.
- Edit the `instanceId` variable in the script to match the ID of your EC2 instance.
- Run the script using `node index.js`.
## Usage
The script takes two parameters: `instanceId` and `action`.

- `instanceId`: The ID of the EC2 instance you want to control.
- `action`: The action you want to perform on the instance. Valid values are `start` and `stop`.

For example, to start an EC2 instance with ID `i-0123456789abcdef0`, run the script with the following command:

```
node index.js --instanceId i-0123456789abcdef0 --action start
```