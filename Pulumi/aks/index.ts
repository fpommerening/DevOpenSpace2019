import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

// Create an Azure Resource Group
const resourceGroup = new azure.core.ResourceGroup("devopenspace-2019-aki-pulumi", {
    location: "WestEurope"
});

import { AksCluster } from "./cluster";

const aks = new AksCluster("k8s-demo-cluster", { resourceGroup });
export const clusterName = aks.cluster.name;
export const kubeConfig = aks.cluster.kubeConfigRaw;