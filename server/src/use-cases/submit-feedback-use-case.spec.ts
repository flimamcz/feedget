import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Example Comment",
        screenshot:
          "data:image/png;base64,skoajhdioushdiusqahd9iuqwhdjiusdsdsad",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()

  });

  it("should not able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Example Comment",
        screenshot:
          "data:image/png;base64,skoajhdioushdiusqahd9iuqwhdjiusdsdsad",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot:
          "data:image/png;base64,skoajhdioushdiusqahd9iuqwhdjiusdsdsad",
      })
    ).rejects.toThrow();
  });

  it("should not able to submit a feedback with and invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "ta tudo bugado",
        screenshot:
          "test.jpg",
      })
    ).rejects.toThrow();
  });

});
