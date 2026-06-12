import { PDFParse } from "pdf-parse";
import { analyzeResume } from "../services/resumeAnalysis.service.js";
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

        const analysis =
  await analyzeResume(
    data.text
  );

     res.status(200).json({
  success: true,
  role: analysis.role,
  skills: analysis.skills,
  resumeText: data.text,
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