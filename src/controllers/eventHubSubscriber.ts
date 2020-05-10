import { EventHubConsumerClient, latestEventPosition } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = "Endpoint=sb://test-hub-vishal.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=M5c0BMeAssoodwMm2ieHv6JnoIOr2Nc9JswvJaW2Jo8=";
// const connectionString = "Endpoint=sb://test-event-hub26.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=iHO+Xaty+LX2jYiSwqaQuc5WWUTCcmBUoHAcF5EAqio=";// process.env["EVENTHUB_CONNECTION_STRING"] || "";;
const eventHubName = "test-hub-vishal";
const consumerGroup = "$Default";

class AzureEventBusSubscriber {

  public async subscribeEvents() {
    console.log("Running receiveEvents sample");
    
    const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

    const subscription = consumerClient.subscribe(
      {
        // The callback where you add your code to process incoming events
        processEvents: async (events, context) => {

          // TODO:
          // ignore previous generated events - generated before this app start
          // 1. Use checkPoint in eventBus OR
          // 2. make your logic based on time stamp of evets

          console.log("***************Getting EVENTS**************");
          for(const event of events){
              

              
              console.log(event);
             
              // if(event.systemProperties["iothub-message-source"] == "devices"){
              //   console.log("<<<<Dveice>>>>>>>>>>");
              //   console.log(event);

              // }

          }

          console.log("Getting Events Ends");
        },
        processError: async (err, context) => {
          console.log(`Error : ${err}`);
        }
      },
      { startPosition:  latestEventPosition}
    );
  }
}

export const azureEventBusService = new AzureEventBusSubscriber();


