package app.calc.dto.request;

import app.calc.utils.UnitOfMeasurement;

public class MaterialRequest {
    private String name;
    private String description;
    private UnitOfMeasurement uomFrom;
    private UnitOfMeasurement uomTo;
    private double price;

    public MaterialRequest() {
    }

    public MaterialRequest(
            String name,
            String description,
            UnitOfMeasurement purchaseUOM,
            UnitOfMeasurement storageUOM,
            double price) {
        this.name = name;
        this.description = description;
        this.uomFrom = uomFrom;
        this.uomTo = uomTo;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UnitOfMeasurement getUOMFrom() {
        return uomFrom;
    }
    public UnitOfMeasurement getUOMTo() {
        return uomTo;
    }

    public double getPrice() {
        return price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUOMFrom(UnitOfMeasurement uomFrom) {
        this.uomFrom = uomFrom;
    }

    public void setUOMFrom(UnitOfMeasurement uomFrom) {
        this.uomFrom = uomFrom;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
