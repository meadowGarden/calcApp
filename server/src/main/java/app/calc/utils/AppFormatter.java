package app.calc.utils;

public class AppFormatter {


    private static final int MATERIAL_ROUNDING = 1000000;
    private static final int BOM_LINES_ROUNDING = 100000;
    private static final int BOM_ROUNDING = 1000;


    public static double roundingMaterialPrice(double n) {
        return (double) Math.round(n * MATERIAL_ROUNDING) / MATERIAL_ROUNDING;
    }

    public static double roundingBOMLinesCosts(double n) {
        return (double) Math.round(n * BOM_LINES_ROUNDING) / BOM_LINES_ROUNDING;
    }

    public static double roundingBOMCosts(double n) {
        return (double) Math.round(n * BOM_ROUNDING) / BOM_ROUNDING;
    }

    public static double adjustPrice(double purchasePrice, double ratio) {
        return roundingMaterialPrice(purchasePrice / ratio);
    }
}
