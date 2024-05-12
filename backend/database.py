import csv
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
            cur.execute("INSERT INTO backend_food VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", row)

    # Confirmar la inserción y cerrar la conexión
    con.commit()
    con.close()

def columnaLactosa():
    con = sql.connect("prueba.db")
    cur = con.cursor()
    cur.execute(
        """ALTER TABLE backend_food
        ADD COLUMN have_lactose INTEGER
        """
    )
    # Actualizar los valores de la nueva columna basados en otra columna
    cur.execute(
        """UPDATE backend_food
        SET have_lactose = CASE
            WHEN lactose < 0.5 THEN 0
            ELSE 1
        END
        """
    )
    con.commit()
    con.close()


def borrarTabla():
    con = sql.connect("prueba.db")
    cur = con.cursor()
    cur.execute("""DROP TABLE IF EXISTS backend_alimento""")
    con.commit()
    con.close()


'''crearBD()'''
meterCSV()
columnaLactosa()
'''borrarTabla()'''