const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'your-ec2-instance-region' });

exports.handler = async (event, context) => {
  try {
    const instanceParams = {
      ImageId: 'your-ec2-instance-image-id',
      InstanceType: 'your-ec2-instance-type',
      MinCount: 1,
      MaxCount: 1,
      KeyName: 'your-ec2-instance-key-name',
      SecurityGroupIds: ['your-ec2-instance-security-group-id'],
      UserData: 'your-user-data-script', // This is optional
    };

    const data = await ec2.runInstances(instanceParams).promise();

    const instanceId = data.Instances[0].InstanceId;

    const commandParams = {
      InstanceIds: [instanceId],
      DocumentName: 'AWS-RunShellScript',
      Parameters: {
        'commands': ['your-command-here'],
      },
    };

    const commandData = await ec2.sendCommand(commandParams).promise();

    console.log(`EC2 instance ${instanceId} started and command ${commandParams.Parameters.commands} is running`);
  } catch (error) {
    console.error(error);
  }
};
