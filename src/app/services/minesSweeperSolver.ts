import { ItemPosition, LevelMap } from "../store/levels/levels.types";
import { forEachNeighbor, randomElement } from "./helpers/solver.helpers";
import { CLOSED_CELL } from "../store/levels/levels.constants";

interface CellData {
  mines: number;
  neighbors: number[];
}

export class MineSweeperSolver {
  private map: LevelMap | undefined;
  private width = 0;
  private height = 0;
  private saveCells: number[] = [];
  private cells: CellData[][] = [];

  setMap(map: LevelMap) {
    this.map = map;
    this.width = map[0].length;
    this.height = map.length;
    this.saveCells = [];
    this.cells = [];

    for (let i = 0; i < this.width * this.height; i++) {
      this.cells[i] = [];
    }

    this.map.forEach((row, y) => {
      row.forEach((item, x) => {
        const mines = +item;

        if (!this.isCovered(x, y) && mines > 0) {
          const neighbors: number[] = [];

          forEachNeighbor(
            x,
            y,
            this.width,
            this.height,
            (x: number, y: number) => {
              if (this.isCovered(x, y)) {
                neighbors.push(this.getIndex(x, y));
              }
            }
          );

          this.fillCellData(mines, neighbors);
        }
      });
    });
  }

  getPosition() {
    if (this.saveCells.length > 0) {
      return this.saveCells.map(index => this.fromIndex(index));
    } else {
      return this.guess();
    }
  }

  private fillCellData(mines: number, neighbors: number[]) {
    if (mines === 0) {
      this.setSaveCell(neighbors);
    }

    let cellData = { mines, neighbors };

    neighbors.forEach(neighbor => {
      this.cells[neighbor].push(cellData);
    });

    const allNeighbors = this.getAllNeighborsCellsData(cellData);

    for (let i = 0; i < allNeighbors.length; i++) {
      if (this.mergeCellData(cellData, allNeighbors[i])) {
        break;
      }
    }
  }

  private removeCellData(cellData: CellData) {
    cellData.neighbors.forEach(neighbor => {
      const cell = this.cells[neighbor];
      const index = cell.indexOf(cellData);
      cell.splice(index, 1);
    });
  }

  private getAllNeighborsCellsData(cellData: CellData) {
    const arr: CellData[] = [];
    cellData.neighbors.forEach(neighbor => {
      this.cells[neighbor].forEach(cell => {
        if (cell !== cellData && arr.indexOf(cell) === -1) {
          arr.push(cell);
        }
      });
    });
    return arr;
  }

  private mergeCellData(a: CellData, b: CellData) {
    if (a.neighbors.length < b.neighbors.length) {
      const tmp = a;
      a = b;
      b = tmp;
    }

    const inA: number[] = [];
    const inB: number[] = [];
    const inAB: number[] = [];

    [...a.neighbors, ...b.neighbors].forEach(neighbor => {
      if (
        a.neighbors.indexOf(neighbor) !== -1 &&
        b.neighbors.indexOf(neighbor) !== -1
      ) {
        inAB.indexOf(neighbor) === -1 && inAB.push(neighbor);
      } else if (a.neighbors.indexOf(neighbor) !== -1) {
        inA.indexOf(neighbor) === -1 && inA.push(neighbor);
      } else {
        inB.indexOf(neighbor) === -1 && inB.push(neighbor);
      }
    });

    if (a.mines - b.mines === inA.length) {
      this.removeCellData(a);
      this.removeCellData(b);
      this.fillCellData(a.mines - b.mines, inA);
      this.fillCellData(b.mines, inAB);
      this.fillCellData(0, inB);
      return true;
    }
    if (b.mines - a.mines === inB.length) {
      this.removeCellData(a);
      this.removeCellData(b);
      this.fillCellData(b.mines - a.mines, inB);
      this.fillCellData(a.mines, inAB);
      this.fillCellData(0, inA);
      return true;
    }
    if (inB.length === 0) {
      this.removeCellData(a);
      this.removeCellData(b);
      this.fillCellData(a.mines - b.mines, inA);
      this.fillCellData(b.mines, b.neighbors);
      return true;
    }
    if (b.mines === b.neighbors.length) {
      this.removeCellData(a);
      this.removeCellData(b);
      this.fillCellData(a.mines - inAB.length, inA);
      this.fillCellData(b.mines, b.neighbors);
      return true;
    }
    if (a.mines === a.neighbors.length) {
      this.removeCellData(b);
      this.removeCellData(a);
      this.fillCellData(b.mines - inAB.length, inB);
      this.fillCellData(a.mines, a.neighbors);
      return true;
    }
    return false;
  }

  private setSaveCell(cells: number[]) {
    cells.forEach((cell, i) => {
      const { x, y } = this.fromIndex(cells[i]);
      if (this.isCovered(x, y) && this.saveCells.indexOf(cells[i]) === -1) {
        this.saveCells.push(cells[i]);
      }
    });
  }

  private getProbability(x: number, y: number) {
    let probability = 0;
    this.cells[this.getIndex(x, y)].forEach(cellData => {
      probability = Math.max(
        probability,
        cellData.mines / cellData.neighbors.length
      );
    });
    return probability;
  }

  private guess() {
    let bestPositions: ItemPosition[] = [];
    let bestProbability = 1;

    this.cells.forEach((_, index) => {
      const { x, y } = this.fromIndex(index);
      if (this.isCovered(x, y)) {
        const probability = this.getProbability(x, y);
        if (probability === bestProbability) {
          bestPositions.push({ x, y });
        } else if (probability < bestProbability) {
          bestProbability = probability;
          bestPositions = [{ x, y }];
        }
      }
    });

    return [randomElement(bestPositions)];
  }

  private fromIndex(i: number) {
    return { x: i % this.width, y: Math.floor(i / this.width) };
  }

  private getIndex(x: number, y: number) {
    return y * this.width + x;
  }

  private isCovered(x: number, y: number) {
    return this.map && this.map[y][x] === CLOSED_CELL;
  }
}

export const mineSweeperSolver = new MineSweeperSolver();
