export interface Review {
    id: number;
    customers: Array<{
        idname: string;
        rated: number;
        profilerpic: string;
        review: string;
        reviewDate: string;
        reviewLİke?: number; // İsteğe bağlı hale getirdik
    }>;
}