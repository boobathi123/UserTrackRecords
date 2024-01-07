import mysql.connector
from datetime import datetime
import asyncio
import serial

db = mysql.connector.connect(
host="localhost",
user="root",
password="shankar",
db="pro"
)
print(db)

def update(id):
    print("ID : "+id)
    id = id.strip()
    mycursor = db.cursor()

    mycursor.execute("select * from users where id='"+id+"'")
    
    dat = mycursor.fetchall()
    name = dat[0][1]
    email = dat[0][2]
    print(name,email)
    
    # Get the current timestamp
    current_timestamp = datetime.now()

    # Convert it to a strings
    timestamp_string = current_timestamp.strftime("%Y-%m-%d %H:%M:%S")
    mycursor.execute("INSERT INTO user_track_recs VALUES (%s , %s , %s , %s);", (id, name, email, timestamp_string))

    db.commit()

arduino_port = 'COM3'
baud_rate = 9600

async def read_from_serial():
    # Open the serial port
    ser = serial.Serial(arduino_port, baud_rate, timeout=1)

    try:
        while True:
            # Read a line from the serial port
            line = ser.readline().decode('utf-8').strip()
            
            # Print the received data
            print("Received:", line)
            if("Card UID: " in line):
                update(line[10::])
            await asyncio.sleep(0.1)  # Optional: Add a small delay to avoid excessive CPU usage

    except KeyboardInterrupt:
        print("Exiting program.")
        ser.close()

if __name__ == "__main__":
    # Create an event loop
    loop = asyncio.get_event_loop()

    # Run the read_from_serial coroutine
    loop.run_until_complete(read_from_serial())