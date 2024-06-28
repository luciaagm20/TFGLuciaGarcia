import csv
import sqlite3 as sql


def crearBD():
    con = sql.connect("sqlite3.db")
    con.commit();
    con.close();

def meterCSV():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    with open('ciqual_comas.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        next(reader)  
        for row in reader:
            cur.execute("INSERT INTO backend_food VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", row)

    con.commit()
    con.close()

def columnaLactosa():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    cur.execute(
        """UPDATE backend_food
        SET has_lactose = CASE
            WHEN lactose < 0.5 THEN FALSE
            ELSE TRUE
        END
        """
    )
    con.commit()
    con.close()

def columnaMarisco():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    cur.execute(
        """UPDATE backend_food
        SET has_seafood = CASE
            WHEN subgroup_code = 407 OR subgroup_code = 408 THEN TRUE
            ELSE FALSE
        END
        """
    )
    con.commit()
    con.close()

def columnaHuevo():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    cur.execute(
        """UPDATE backend_food
        SET has_egg = CASE
            WHEN subgroup_code = 410 THEN TRUE
            ELSE FALSE
        END
        """
    )
    con.commit()
    con.close()


def borrarTabla():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    cur.execute("DELETE FROM backend_food")
    con.commit()
    con.close()

def meterAlergias():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    allergies = [
        ('Celiac disease',),
        ('Lactose intolerant',),
        ('Seafood',),
        ('Egg allergy',),
        ('None',)
    ]
    cur.executemany("INSERT INTO backend_allergies (allergy_type) VALUES (?)", allergies)
    con.commit()
    con.close()

def meterComidas():
    con = sql.connect("sqlite3.db")
    cur = con.cursor()
    name_meal = [
        ('Breakfast',),
        ('Lunch',),
        ('Snack',),
        ('Dinner',),

    ]
    cur.executemany("INSERT INTO backend_meal (name_meal) VALUES (?)", name_meal)
    con.commit()
    con.close()


'''crearBD()'''
meterCSV()
columnaLactosa()
columnaMarisco()
columnaHuevo()
meterAlergias()
meterComidas()
