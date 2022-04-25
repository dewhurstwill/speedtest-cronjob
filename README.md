# Speedtest Service - CronJob
---

A cronjob service that consumes [speedtest-service](https://github.com/dewhurstwill/speedtest-service) package

## Prequesties
---

Ensure that speedtest is installed. [Available here.](https://www.speedtest.net/apps/cli)
    
### Mac OS:
```bash
brew tap teamookla/speedtest 
brew update
brew install speedtest
```

### Debian/Ubuntu:
```bash
sudo apt-get install curl
curl -s https://install.speedtest.net/app/cli/install.deb.sh | sudo bash
sudo apt-get install speedtest
```

### Fedora/RedHat/CentOS:
```bash
curl -s https://install.speedtest.net/app/cli/install.rpm.sh | sudo bash
sudo yum install speedtest
```

<br/>

## Locally
---

### Usage
```bash
EXPORT MONGODB_URI=mongodb://localhost:27017/speedtest

yarn install

node index.js
```

### Example DB document
```json
{
  date: '2022-01-01',
  server: { 
    org: 'YouFibre', 
    location: 'Manchester', 
    id: '48475' 
  },
  isp: 'Hyperoptic Ltd',
  latency: '2.05 ms',
  download: '195.15 Mbps',
  upload: '368.53 Mbps',
  packetLoss: 'Not available.',
  resultUrl: 'https://www.speedtest.net/result/c/2b753g91-24h5-67aa-111g-7g999a9a99aa'
}
```

<br/>

## Docker
---

### Build
```bash
docker build -t registry/image_name:tag .
docker push registry/image_name:tag
```

<br/>

## Kubernetes
---

### Template

Edit the files found [here](https://github.com/dewhurstwill/speedtest-cronjob/tree/main/_devops/kubernetes) and then you can apply them using

```bash
kubectl create -f ./_devops/kubernetes 
```