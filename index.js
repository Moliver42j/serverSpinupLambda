const { EC2, SSM } = require('@aws-sdk/client-ec2');
const { SSMClient, SendCommandCommand } = require('@aws-sdk/client-ssm');

exports.handler = async (event) => {
  // Set the region where your EC2 instance is located
  const region = 'eu-west-1';

  // Create an EC2 client instance
  const ec2Client = new EC2({ region });

  // Set the name of the EC2 instance you want to start
  const instanceName = 'zomboidServerForTheBoys';

  try {
    // Retrieve the instance ID for the specified instance name
    const data = await ec2Client.describeInstances({
      Filters: [
        {
          Name: 'tag:Name',
          Values: [instanceName],
        },
      ],
    });

    const instanceId = data.Reservations[0].Instances[0].InstanceId;
    console.log(`Instance ID: ${instanceId}`);

    // Set the command you want to run on the EC2 instance
    const command = 'ls -l';

    // Start the EC2 instance
    await ec2Client.startInstances({ InstanceIds: [instanceId] });
    console.log(`Instance started: ${instanceId}`);

    // Wait for the EC2 instance to start
    await ec2Client.waitFor('instanceRunning', { InstanceIds: [instanceId] });
    console.log(`Instance running: ${instanceId}`);

    // Send the command to the EC2 instance using SSM
    const ssmClient = new SSMClient({ region });
    const data2 = await ssmClient.send(new SendCommandCommand({
      DocumentName: 'AWS-RunShellScript',
      InstanceIds: [instanceId],
      Parameters: { commands: [command] },
    }));

    console.log(`Command sent to instance: ${instanceId}`);
    console.log(`Command ID: ${data2.Command.CommandId}`);
    
    const response = {
      statusCode: 200,
      body: JSON.stringify(`Command sent to instance: ${instanceId}\nCommand ID: ${data2.Command.CommandId}`),
    };
    return response;
  } catch (err) {
    console.log(`Error: ${err}`);
    const response = {
      statusCode: 500,
      body: JSON.stringify(`Error: ${err}`),
    };
    return response;
  }
};
