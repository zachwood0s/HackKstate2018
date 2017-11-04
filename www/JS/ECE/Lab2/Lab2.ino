unsigned long LedTimer1;
unsigned long LedTimer2;
void setup() {
  pinMode( 13, OUTPUT );
  pinMode( 12, OUTPUT );
  LedTimer1 = millis();
  LedTimer2 = millis();
}
void loop() {
  if (millis() - LedTimer1 >= 20 ) {
    if ( digitalRead(13) == HIGH ) {
      digitalWrite( 13, LOW );
    }
    else {
      digitalWrite( 13, HIGH );

    }
    LedTimer += 10;
  }
  if (millis() - LedTimer2 >= 20 ) {
    if ( digitalRead(12) == HIGH ) {
      digitalWrite( 12, LOW );

    }
    else {
      digitalWrite( 12, HIGH );

    }
    LedTimer2 += 10;
  }
}
