# NodeBeat Backend

## A NodeJs based API designed to provid HeartBeat details for a given host. Designed to be polled regualry for downtime notification.

---

### Run Locally

``` 
docker run -t -d -p 3000:3000 -e NODE_ENV=dev \
  -e TOKEN_SECRETE=12345 \
  -e USER_SECRETE=12345 \
  keepalive:latest
```
