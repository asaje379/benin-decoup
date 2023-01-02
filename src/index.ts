import express, { Request, Response } from 'express';
import cors from 'cors';
import benin from './benin.json';

const app = express();
app.use(cors());

app.get('/departments', async (req: Request, res: Response) => {
  const departments = benin.map((item) => ({
    id: item.id_dep,
    label: item.lib_dep,
  }));
  res.status(200).json(departments);
});

app.get('/communes/:dep', async (req: Request, res: Response) => {
  const dep = req.params.dep;
  const department = benin.find(
    (item) => item.id_dep === +dep || item.lib_dep === dep
  );
  const communes = department?.communes;
  const $communes = communes?.map((item) => ({
    id: item.id_com,
    label: item.lib_com,
  }));
  res.status(200).json($communes);
});

app.get('/arrondissements/:com', async (req: Request, res: Response) => {
  const com = req.params.com;
  let commune;
  for (const dep of benin) {
    const res = dep.communes.find(
      (item) => item.id_com === +com || item.lib_com === com
    );
    if (res) {
      commune = res;
      break;
    }
  }
  const arrs = commune?.arrondissements;
  const $arrs = arrs?.map((item) => ({
    id: item.id_arrond,
    label: item.lib_arrond,
  }));
  res.status(200).json($arrs);
});

app.get('/quartiers/:arr', async (req: Request, res: Response) => {
  const arr = req.params.arr;
  let arrondissement;
  for (const dep of benin) {
    for (const com of dep.communes) {
      const res = com.arrondissements.find(
        (item) => item.id_arrond === +arr || item.lib_arrond === arr
      );
      if (res) {
        arrondissement = res;
      }
    }
  }
  const quartiers = arrondissement?.quartiers.map((item) => ({
    id: item.id_quart,
    label: item.lib_quart,
  }));

  res.status(200).json(quartiers);
});

app.listen(3011, () => console.log('Server is running'));
