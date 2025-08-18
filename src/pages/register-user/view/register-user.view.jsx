import { ROUTES_PATHS } from "../../../utils/enums/routes-url";

export function RegisterUserView() {
    return (
        <div>
            <h1>Register User Page</h1>
            <p>This is where the user registration form will go.</p>
            <a href={ROUTES_PATHS.HOME}>Go to Home</a>
        </div>
    );
}