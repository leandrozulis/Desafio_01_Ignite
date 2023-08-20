import { randomUUID } from 'node:crypto';
import { DataBase } from './dataBase.js';
import { buildRoutePath } from './src/utils/build-route-path.js';
import { dateAtual } from './src/utils/date.js';

const dataBase = new DataBase()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const task = dataBase.listaTask('tasks', search ? {
        title: search,
        description: search
      } : null)

      return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title || !description) {
        return res.writeHead(404).end('É preciso que contenha o Title e Description na Request')
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        complete: false,
        created_at: dateAtual(),
        completed_at: null,
        updated_at: dateAtual()
      }

      dataBase.createTask('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body;

      const index = dataBase.dataBase.tasks.findIndex(row => row.id === id)

      if (index === -1) {
        return res.writeHead(404).end('ID não localizado')
      }

      dataBase.updataTask('tasks', id, {
        title,
        description,
        updated_at: dateAtual()
      });

      return res.writeHead(204).end()

    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const { complete } = req.body

      const index = dataBase.dataBase.tasks.findIndex(row => row.id === id)

      if (index === -1) {
        return res.writeHead(404).end('ID não localizado')
      }

      dataBase.completaTask('tasks', id, complete);

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const index = dataBase.dataBase.tasks.findIndex(row => row.id === id)

      if (index === -1) {
        return res.writeHead(404).end('ID não localizado')
      }

      dataBase.removeTask('tasks', id);

      return res.writeHead(204).end()
    }
  }
]