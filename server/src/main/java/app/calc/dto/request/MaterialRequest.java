package app.calc.dto.request;

import app.calc.utils.UnitOfMeasurement;

public class MaterialRequest {
    private String name;
    private String description;
    private UnitOfMeasurement purchaseUOM;
    private UnitOfMeasurement storageUOM;
    private double conversionRatio;
    private double purchasePrice;
    private double price;

    public MaterialRequest() {
    }

    public MaterialRequest(
            String name,
            String description,
            UnitOfMeasurement purchaseUOM,
            UnitOfMeasurement storageUOM,
            double conversionRatio,
            double purchasePrice
            ) {
        this.name = name;
        this.description = description;
        this.purchaseUOM = purchaseUOM;
        this.storageUOM = storageUOM;
        this.conversionRatio = conversionRatio;
        this.purchasePrice = purchasePrice;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UnitOfMeasurement getPurchaseUOM() {
        return purchaseUOM;
    }

    public void setPurchaseUOM(UnitOfMeasurement purchaseUOM) {
        this.purchaseUOM = purchaseUOM;
    }

    public UnitOfMeasurement getStorageUOM() {
        return storageUOM;
    }

    public void setStorageUOM(UnitOfMeasurement storageUOM) {
        this.storageUOM = storageUOM;
    }

    public double getConversionRatio() {
        return conversionRatio;
    }

    public void setConversionRatio(double conversionRatio) {
        this.conversionRatio = conversionRatio;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
