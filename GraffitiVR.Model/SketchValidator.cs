using FluentValidation;

namespace GraffitiVR.Model{

    public class SketchValidator : AbstractValidator<Sketch> {
	public SketchValidator() {
		RuleFor(x => x.Code).NotNull().NotEmpty();
		RuleFor(x => x.CreatedBy).NotEmpty();
        RuleFor(x => x.UpdatedBy).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Type).NotEmpty();
        RuleFor(x => x).NotEmpty();


	}
}
}