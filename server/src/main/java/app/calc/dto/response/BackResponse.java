package app.calc.dto.response;

import org.springframework.http.HttpStatus;

public class BackResponse<T> {
    private T object;
    private HttpStatus status;

    public BackResponse(T object, HttpStatus status) {
        this.object = object;
        this.status = status;
    }

    public T getObject() {
        return object;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setObject(T entity) {
        this.object = entity;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
