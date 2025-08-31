import { MainLayout, MainGrid } from '../../components';

const Vehicles = () => {
  return (
    <MainLayout title={'مركبات'}>
      <MainGrid
        pk="vehicles"
        StaticWidth
        tableHead={[
          {
            key: 'DriverName',
            label: 'اسم السائق',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'PlateNo',
            label: 'رقم المركبه',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'VehicleType',
            label: 'نوع المركبه',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'StartKm',
            label: 'كيلومتر عند الانطلاق',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'StartPlace',
            label: 'مكان الانطلاق',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'StartTime',
            label: 'وقت الانطلاق',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'EndKm',
            label: 'كيلومتر عند النهايه',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'EndPlace',
            label: 'الوجهه',
            visible: true,
            input: true,
            width: 120,
          },
          {
            key: 'EndTime',
            label: 'وقت الوصول',
            visible: true,
            input: true,
            width: 120,
          },
        ]}
      />
    </MainLayout>
  );
};

export default Vehicles;
