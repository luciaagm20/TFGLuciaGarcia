import csv
from itertools import product
import sqlite3 as sql


def crearBD():
    con = sql.connect("prueba.db")
    con.commit();
    con.close();

def meterCSV():
    con = sql.connect("prueba.db")
    cur = con.cursor()
    with open('ciqual_comas.csv', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        next(reader)  # Omitir la primera fila si contiene encabezados de columna
        for row in reader:
            # Generar la consulta SQL para insertar esta fila en la tabla
            cur.execute("INSERT INTO backend_food VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", row)

    # Confirmar la inserción y cerrar la conexión
    con.commit()
    con.close()

def columnaLactosa():
    con = sql.connect("prueba.db")
    cur = con.cursor()
    # cur.execute(
    #     """ALTER TABLE backend_food
    #     ADD COLUMN has_lactose BOOLEAN
    #     """
    # )
    # Actualizar los valores de la nueva columna basados en otra columna
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
    con = sql.connect("prueba.db")
    cur = con.cursor()
    # cur.execute(
    #     """ALTER TABLE backend_food
    #     ADD COLUMN has_seafood INTEGER
    #     """
    # )
    # Actualizar los valores de la nueva columna basados en otra columna
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
    con = sql.connect("prueba.db")
    cur = con.cursor()
    # cur.execute(
    #     """ALTER TABLE backend_food
    #     ADD COLUMN has_egg INTEGER
    #     """
    # )
    # Actualizar los valores de la nueva columna basados en otra columna
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
    con = sql.connect("prueba.db")
    cur = con.cursor()
    cur.execute("DELETE FROM backend_food")
    con.commit()
    con.close()

def meterAlergias():
    con = sql.connect("prueba.db")
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
    con = sql.connect("prueba.db")
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
# borrarTabla()
# INSERT INTO backend_double_food SELECT ... FROM backend_food INNER JOIN backend_food