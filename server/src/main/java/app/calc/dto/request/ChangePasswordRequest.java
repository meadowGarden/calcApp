package app.calc.dto.request;
public class ChangePasswordRequest {
    private final String oldPassword;
    private final String newPassword;

    public ChangePasswordRequest(final String oldPassword, final String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    @Override
    public String toString() {
        return "";
    }
}
