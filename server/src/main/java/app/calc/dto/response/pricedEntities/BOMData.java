package app.calc.dto.response.pricedEntities;

public class BOMData<T> {
    private final T entity;
    private final double costs;

    public BOMData(T entity, double costs) {
        this.entity = entity;
        this.costs = costs;
    }

    public T getEntity() {
        return entity;
    }

    public double getCosts() {
        return costs;
    }
}
