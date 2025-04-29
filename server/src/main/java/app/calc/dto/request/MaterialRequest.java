package app.calc.dto.request;

import app.calc.utils.UnitOfMeasurement;

public class MaterialRequest {
    private String name;
    private String description;
    private UnitOfMeasurement uom;
    private double price;

    public MaterialRequest() {
    }

    public MaterialRequest(String name, String description, UnitOfMeasurement uom, double price) {
        this.name = name;
        this.description = description;
        this.uom = uom;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UnitOfMeasurement getUOM() {
        return uom;
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

    public void setUOM(UnitOfMeasurement uom) {
        this.uom = uom;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
