import { Pin, PinCluster, ProjectedPin } from "../staticData/pins";

const grpDst = 30;

export default async (projectedPins: ProjectedPin[]): Promise<PinCluster[]> => {
  try {
    const grouped = projectedPins.reduce(
      (acc: PinCluster[], pin: ProjectedPin) => {
        const index = acc.findIndex(
          (c: PinCluster) =>
            Math.abs(c.pins[0].screenLocation.x - pin.screenLocation.x) <=
              grpDst &&
            Math.abs(c.pins[0].screenLocation.y - pin.screenLocation.y) <=
              grpDst &&
            c.pins[0].possessionType === pin.possessionType
        );
        if (index === -1) {
          acc.push({
            pins: [pin],
            isSelected: pin.isSelected
          });
        } else {
          acc[index].pins.push(pin);
          if (pin.isSelected && !acc[index].isSelected) {
            acc[index].isSelected = true;
          }
        }

        return acc;
      },
      []
    );
    return grouped;
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    throw new Error(error.message);
  }
};
