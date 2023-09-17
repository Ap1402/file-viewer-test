# node test app

### Backend

#### File Data API Documentation

This API endpoint allows you to retrieve data from CSV files. It is accessible at `localhost:3005/api/files/data`.

#### Endpoint Details

- **URL:** `localhost:3005/api/files/data`
- **Method:** GET

#### Query Parameters

- `fileName` (optional): The name of the CSV file you want to retrieve data from.

#### Response Codes

- `200 OK`: Successful request. Data is returned.
- `500 Internal Server Error`: An error occurred while processing the request.

#### Example - 200 OK

##### Request

GET localhost:3005/api/files/data

##### Response
```json
[
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "cGsggbPtRtJlFQJVjbcfEYYpZIPZr",
        "number": "00629280680433254943990968662540",
        "hex": "9b6031257d716ac8acbb3d1c6d804d60"
      }
    ]
  },
  {
    "file": "test3.csv",
    "lines": [
      {
        "text": "EmheluYvtcCiVWYbRYqJfedpm",
        "number": "7",
        "hex": "0826511bf4ddb55e7aad7b004cd660e0"
      }
    ]
  }
]
```

#### Example - 200 OK Specific Filename

##### Request

GET localhost:3005/api/files/data?fileName=test2.csv

##### Response
```json
[
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "cGsggbPtRtJlFQJVjbcfEYYpZIPZr",
        "number": "00629280680433254943990968662540",
        "hex": "9b6031257d716ac8acbb3d1c6d804d60"
      }
    ]
  }
]
```

#### Example - 200 OK No file found

##### Request

GET localhost:3005/api/files/data?fileName=nofile.csv

##### Response
```json
[]
```