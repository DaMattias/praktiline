# Ülesanne 1:

"""
Klassi ja objekti eristab nende sisu. Klass on n-ö raam, kus on kohad andmete ja alamfunktsioonide jaoks. Objektile saab lisada atribuute, nagu nimi, vanus, kaal jne.
"""

# Ülesanne 2:

"""
Meetodid on põhimõtteliselt funktsioonid, aga meetod asub klassi sees ja on klassiga seotud, meetodit kutsutakse välja teistmoodi kui funktsiooni.
"""

# Ülesanne 3:

class Dog():
    def __init__(self):
        self.age = 0
        self.name = ""
        self.weight = 0

pontu = Dog()
pontu.age = 12
pontu.name = "Pontu"
pontu.weight = 27

# Ülesanne 4:

class Person():
    def __init__(self):
        self.name = ""
        self.cell_phone = ""
        self.email = ""

reelika = Person()
reelika.name = "Reelika"
reelika.cell_phone = 54541010
reelika.email = "reelika@hot.ee"

sandra = Person()
sandra.name = "Sandra"
sandra.cell_phone = 9002004

# Ülesanne 5:

class Bird():
    def __init__(self):
        self.color = ""
        self.name = ""
        self.breed = ""

my_bird = Bird()
my_bird.color = "green"
my_bird.name = "Sunny"
my_bird.breed = "Sun Conure"

# Ülesanne 6:

class  Char():
    def __init__(self):
        self.position = ""
        self.name = ""
        self.strength = ""

# Ülesanne 7:

"""
Name ja money luuakse tavaliste muutujatena. Et atribuutidena neid esitada peaks olema seal read peale nancy = Person():
nancy.name = "Nancy"
nancy.money = 100
"""

# Ülesanne 8:

"""
Money pole defineeritud.
"""

# Ülesanne 9:

"""
Bobile pole nime antud. Ta on küll inimesena valmis, kuid bob.nimi võrdub siiski tühja stringiga.
"""
