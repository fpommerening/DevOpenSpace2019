import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";


const rg = new azure.core.ResourceGroup("devopenspace-2019-aci-pulumi", {
    location: "WestEurope"
});


const aci = new azure.containerservice.Group("dos-demo", {
    containers:[{
        name: "hallowelt",
        image: "fpommerening/docker-training:latest",
        memory: 1,
        cpu: 1,
        ports:[{
            port:80, protocol:"TCP"
        }] 
    }],
    osType: "Linux",
    dnsNameLabel: "dos-aci-fp-demo1",
    resourceGroupName: rg.name,
    location: rg.location 
});

exports.publicIP = aci.ipAddress;
exports.fqdn = aci.fqdn;

