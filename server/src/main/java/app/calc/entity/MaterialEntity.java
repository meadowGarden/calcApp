package app.calc.entity;

import app.calc.utils.UnitOfMeasurement;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "materials")
public class MaterialEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "purchase_uom")
    @Enumerated(EnumType.STRING)
    private UnitOfMeasurement purchaseUOM;

    @Column(name = "storage_uom")
    @Enumerated(EnumType.STRING)
    private UnitOfMeasurement storageUOM;

    @Column(name = "purchase_price")
    private double purchasePrice;

    @Column(name = "price")
    private double price;

    @Column(name = "conversion_ratio")
    private double conversionRatio;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<BOMLineEntity> bomLines;

    public MaterialEntity() {
    }

    public MaterialEntity(
            String name,
            String description,
            UnitOfMeasurement purchaseUOM,
            UnitOfMeasurement storageUOM,
            double purchasePrice,
            double price,
            double conversionRatio
    ){
        this.name = name;
        this.description = description;
        this.purchaseUOM = purchaseUOM;
        this.storageUOM = storageUOM;
        this.purchasePrice = purchasePrice;
        this.price = price;
        this.conversionRatio = conversionRatio;
    }

    public MaterialEntity(
            long id,
            String name,
            String description,
            UnitOfMeasurement purchaseUOM,
            UnitOfMeasurement storageUOM,
            double purchasePrice,
            double price,
            double conversionRatio
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.purchaseUOM = purchaseUOM;
        this.storageUOM = storageUOM;
        this.purchasePrice = purchasePrice;
        this.price = price;
        this.conversionRatio = conversionRatio;
    }

    public long getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UnitOfMeasurement getPurchaseUOM() {
        return purchaseUOM;
    }

    public UnitOfMeasurement getStorageUOM() {
        return storageUOM;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }

    public double getPrice() {
        return price;
    }

    public double getConversionRatio() {
        return conversionRatio;
    }

    public Set<BOMLineEntity> getBomLines() {
        return bomLines;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPurchaseUOM(UnitOfMeasurement purchaseUOM) {
        this.purchaseUOM = purchaseUOM;
    }

    public void setStorageUOM(UnitOfMeasurement storageUOM) {
        this.storageUOM = storageUOM;
    }

    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setConversionRatio(double conversionRatio) {
        this.conversionRatio = conversionRatio;
    }

    public void setBomLines(Set<BOMLineEntity> bomLines) {
        this.bomLines = bomLines;
    }

    @Override
    public String toString() {
        return String.format(
                "materials {id: %d, name: %s, description: %s, purchase data: %s, price: %.3f, storage data: %s, price: %.3f}",
                this.id, this.name, this.description, this.purchaseUOM, this.purchasePrice, this.storageUOM, this.price);
    }
}
