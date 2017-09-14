using FluentValidation;

namespace GraffitiVR.Model{

    public class UserValidator : AbstractValidator<User> {
        public UserValidator() {
            RuleFor(x => x.FirstName).NotNull().NotEmpty();
            RuleFor(x => x.LastName).NotNull().NotEmpty();
            RuleFor(x => x.UserName).NotNull().NotEmpty();
            RuleFor(x => x.Password).NotNull().NotEmpty();
            RuleFor(x => x.CreatedBy).NotEmpty();
            RuleFor(x => x.UpdatedBy).NotEmpty();
        }
    }

}