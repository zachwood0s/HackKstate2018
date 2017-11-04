unsigned long LedTimer;               // Initialize variables
unsigned char letter = 'A';
unsigned int number = 0;

void setup() {
  Serial.begin(9600);                 // Set up serial port
  LedTimer = millis();  
}

void loop() {
  if(millis() - LedTimer >= 500)      // Check for millis
  { Serial.print(letter);             // Print the data
    Serial.print(number);
    letter++; number++;               // Increment variables
    
    if(letter > 'Z') letter = 'A';    // Reset variables
    if(number > 9) number = 0;
    
    LedTimer += 500;
  }

  if(Serial.available() > 0)          // Check if avalible and read
  { if(Serial.read() == 'R')
    { number = 0;                     // Reset variables
      letter = 'A';
    }
  }
}
