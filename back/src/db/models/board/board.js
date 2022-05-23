import models, { Sequelize } from "../index";

// const Op = Sequelize.Op;

// page 계산
const boardPagination = async ({ page, perPage, query = null }) => {
  const paginateQuery = {
    where: query,
    order: [["createdAt", "DESC"]],
    limit: perPage,
    offset: perPage * (page - 1),
  };
  const { count, rows } = await models.Board.findAndCountAll(paginateQuery);
  const totalPage = Math.ceil(count / perPage);

  return { totalPage, rows };
};

class boardModel {
  static async insertBoard({ newBoard }) {
    const insertBoard = await models.Board.create(newBoard);
    return insertBoard;
  }

  static async findByBoardId({ boardId }) {
    const board = await models.Board.findOne({ where: { boardId } });
    return board;
  }

  static async findByUserId({ userId }) {
    const boardList = await models.Board.findAll({ where: { userId } });
    return boardList;
  }

  static async findBoardList() {
    const boardList = await models.Board.findAll({
      attributes: ["id", "boardId", "userId", "userName", "title", "createdAt"],
    });
    return boardList;
  }

  static async findBoardListByPage({ page, perPage }) {
    try {
      const { totalPage, rows } = await boardPagination({
        page,
        perPage,
      });
      return {
        status: "succ",
        payload: { totalPage, boardList: rows },
      };
    } catch (error) {
      return {
        status: "failed",
        message: "게시글이 없네요..",
      };
    }
  }

  static async update({ boardId, toUpdate }) {
    const filter = { boardId };
    const updatedBoard = await models.Board.update(toUpdate, {
      where: filter,
    });

    return updatedBoard;
  }

  static async deleteByBoardId({ boardId }) {
    const result = await models.Board.destroy({ where: { boardId } });
    const deletedResult = result === 1;
    return deletedResult;
  }

  static async deleteByUserId({ userId }) {
    const result = await models.Board.destroy({ where: { userId } });
    return result;
  }
}

export { boardModel };