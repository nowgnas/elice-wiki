import { authService } from "../services/authService";

class authController {
  static async newQuestion(req, res, next) {
    try {
        const { question, answer } = req.body;
        const createdQuestion = await authService.createQuestion({ question, answer });
        res.status(200).json({ createdQuestion });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentQuestion(req, res, next) {
    try {
        const currentQuestion = await authService.getCurrentQuestion();

        res.status(200).json(currentQuestion);
    } catch (error) {
      next(error);
    }
  }

  static async updateCurrentQuestion(req, res, next) {
    try {
        const { question, answer } = req.body;

        const currentQuestion = await authService.updateQuestion({ question, answer });

        res.status(200).json(currentQuestion);      
    } catch (error) {
      next(error);
    }
  }

  static async deleteCurrentQuestion(req, res, next) {
    try {
      await authService.deleteQuestion();

      res.status(200).send("Deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async getQuestions(req, res, next) {
    try {
        const questions = await authService.findAll();
        res.status(200).json({ questions });
    } catch (error) {
      next(error);
    }
  }
}
export { userController };