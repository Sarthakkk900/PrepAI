import { PDFParse } from "pdf-parse";

export const uploadResume =
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Resume file required",
        });
      }

      const parser =
        new PDFParse({
          data:
            req.file.buffer,
        });

      const data =
        await parser.getText();

      res.status(200).json({
        success: true,
        resumeText:
          data.text,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };