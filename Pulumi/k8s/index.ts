import * as k8s from "@pulumi/kubernetes";

const appLabelTimeSrc = { app: "time" };
const appLabelPingSrc = { app: "pingme" };
const appLabelUiSrc = { app: "ui" };


const depTimePHP = new k8s.apps.v1.Deployment("timephp", {
    spec: {
        selector: { matchLabels: appLabelTimeSrc },
        replicas: 5,
        template: {
            metadata: { labels: appLabelTimeSrc },
            spec: {
                containers: [
                    {
                        name: "timephp",
                        image: "fpommerening/docker-training:microservice.time.php",
                        ports: [{ containerPort: 80 }],
                    }
                ]
            }
        }
    }
});

const cfg = new k8s.core.v1.ConfigMap("timecfg", {
    data: {
        "timeurl": "http://0.0.0.0:80"
    },

});

const depTimeDotnet = new k8s.apps.v1.Deployment("timedotnet", {
    spec: {
        selector: { matchLabels: appLabelTimeSrc },
        replicas: 5,
        template: {
            metadata: { labels: appLabelTimeSrc },
            spec: {
                containers: [
                    {
                        name: "timedotnet",
                        image: "fpommerening/docker-training:microservice.time.dotnet",
                        env: [
                            {
                                name: "ASPNETCORE_URLS",
                                valueFrom: {
                                    configMapKeyRef: {
                                        name: cfg.metadata.name,
                                        key: "timeurl"
                                    }
                                }
                            }
                        ],
                        ports: [{ containerPort: 80 }],
                    }]
            }
        }
    }
});

const depPingMe = new k8s.apps.v1.Deployment("pingmedotnet", {
    spec: {
        selector: { matchLabels: appLabelPingSrc },
        replicas: 1,
        template: {
            metadata: { labels: appLabelPingSrc },
            spec: {
                containers: [
                    {
                        name: "pingmedotnet",
                        image: "fpommerening/docker-training:microservice.pingme.dotnet",
                        ports: [{ containerPort: 5000 }],
                    }]
            }
        }
    }
});

const depUI = new k8s.apps.v1.Deployment("ui", {
    spec: {
        selector: { matchLabels: appLabelUiSrc },
        replicas: 1,
        template: {
            metadata: { labels: appLabelUiSrc },
            spec: {
                containers: [
                    {
                        name: "ui",
                        image: "fpommerening/docker-training:microservice.ui.dotnet",
                        ports: [{ containerPort: 5000 }],
                        env: [
                            {
                                name: "PingMeUrl",
                                value  : "http://srvpingme:5000/"
                            },
                            {
                                name: "TimeUrl",
                                value  : "http://srvtime/api/time"
                            }
                        ],
                    }]
            }
        }
    }
});

const srvTime = new k8s.core.v1.Service("srvtime", {
    metadata: {
        name: "srvtime",
        labels: appLabelTimeSrc,
    },
    spec: {
        ports: [{ port: 80, targetPort: 80 }],
        selector: appLabelTimeSrc,
    },
});

const srvPingMe = new k8s.core.v1.Service("srvpingme", {
    metadata: {
        name: "srvpingme",
        labels: appLabelPingSrc,
    },
    spec: {
        ports: [{ port: 5000, targetPort: 5000 }],
        selector: appLabelPingSrc,
    },
});

const srvui = new k8s.core.v1.Service("frontend", {
    metadata: {
        name: "frontend",
        labels: appLabelUiSrc,
    },
    spec: {
        type: "LoadBalancer",
        ports: [{ port: 9500,targetPort: 5000, protocol: "TCP" }],
        selector: appLabelUiSrc,
    },
});




export const name1 = depTimePHP.metadata.name;
export const name2 = depTimeDotnet.metadata.name;
export const name3 = depPingMe.metadata.name;
export const name4 = depUI.metadata.name;
