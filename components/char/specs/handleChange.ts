import { CharSpecs } from '@/src/models/sheet/char-specs';

export const handleChange = (
  prevState: CharSpecs,
  updatedValue: number,
  field: string,
  attributeType?: string,
  skillType?: string,
) => {
  if (attributeType && skillType) {
    const updatedAttributes = prevState.attributes.map((attr) =>
      attr.type === attributeType
        ? {
            ...attr,
            skills: attr.skills.map((sk) =>
              sk.type === skillType ? { ...sk, value: updatedValue } : sk,
            ),
          }
        : attr,
    );
    return { ...prevState, attributes: updatedAttributes };
  } else if (attributeType) {
    const updatedAttributes = prevState.attributes.map((attr) =>
      attr.type === attributeType
        ? {
            ...attr,
            [field]: updatedValue,
            modifier: field === 'value' ? Math.floor((updatedValue - 10) / 2) : attr.modifier,
          }
        : attr,
    );
    return { ...prevState, attributes: updatedAttributes };
  } else {
    return { ...prevState, [field]: updatedValue };
  }
};
