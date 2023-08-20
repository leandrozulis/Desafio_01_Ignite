import fs from 'node:fs/promises';
import { dateAtual } from './src/utils/date.js';

const link = new URL('arquivo.json', import.meta.url)

export class DataBase {

  dataBase = {}

  constructor() {
    fs.readFile(link, 'utf8')
      .then(data => {
        this.dataBase = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(link, JSON.stringify(this.dataBase))
  }

  //POST
  createTask(table, data) {
    if (Array.isArray(this.dataBase[table])) {
      this.dataBase[table].push(data)
    } else {
      this.dataBase[table] = [data]
    }

    this.#persist();

    return data;
  }

  //GET
  listaTask(table, search) {
    let data = this.dataBase[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data;
  }

  //PUT
  updataTask(table, id, data) {
    const index = this.dataBase[table].findIndex(row => row.id === id)

    if (index > -1) {
      const indexLocalizado = this.dataBase[table][index];
      const updateIndex = { ...indexLocalizado, ...data };

      if (data.title === undefined) {
        updateIndex.title = indexLocalizado.title;
      }

      if (data.description === undefined) {
        updateIndex.description = indexLocalizado.description;
      }

      if (data.created_at === undefined) {
        updateIndex.created_at = indexLocalizado.created_at;
      }

      if (data.completed_at === undefined) {
        updateIndex.completed_at = indexLocalizado.completed_at;
      }

      this.dataBase[table][index] = updateIndex;
      this.#persist();
    } else {
      return
    }
  }

  //DELETE
  removeTask(table, id) {
    const index = this.dataBase[table].findIndex(row => row.id === id)

    if (index > -1) {
      this.dataBase[table].splice(index, 1)
      this.#persist()
    }
  }

  completaTask(table, id, data) {
    const index = this.dataBase[table].findIndex(row => row.id === id)

    if (index > -1) {
      this.dataBase[table][index].complete = data
      this.dataBase[table][index].completed_at = dateAtual();
      this.#persist()
    }
  }

  //??
  importTask() { }

}