unsigned long LedTimer;
unsigned char letter = 'A';
unsigned int number = 0;

void setup() {
  Serial.begin(9600);
  LedTimer = millis();  
}

void loop() {
  if(millis() - LedTimer >= 500)
  { Serial.print(letter);
    Serial.print(number);
    letter++; number++;
    
    if(letter > 'Z') letter = 'A';
    if(number > 9) number = 0;
    
    LedTimer += 500;
  }

  if(Serial.available() > 0)
  { if(Serial.read() == 'R')
    { number = 0;
      letter = 'A';
    }
  }
}
