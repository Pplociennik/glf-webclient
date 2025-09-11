export interface InputRequirementModel {
    description: string;
    isValid: boolean;
    validator: (value: string) => boolean;
}    
