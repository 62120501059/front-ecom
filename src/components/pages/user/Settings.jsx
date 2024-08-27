import React, { useState, useEffect } from "react";
import Resize from 'react-image-file-resizer';
import axios from "axios";
import { saveAddress } from "../../function/users";
import Swal from "sweetalert2";
import { readUsers } from "../../function/users";
import { useSelector } from "react-redux";
import provincesData from '../../../province.json';
import amphuresData from '../../../amphures.json'
const Settings = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user.user.fname);
  const [lname, setLname] = useState(user.user.lname);
  const [phone, setPhone] = useState(user.user.tel);
  const [values, setValues] = useState();
  const [data, setData] = useState();
  let proviceID = 0
  let amp = []
  const [provinces, setProvinces] = useState([]); // เก็บข้อมูลจังหวัด
  const [amphures, setAmphures] = useState([]); // เก็บข้อมูลจังหวัด
  const [address, setAddress] = useState({
    addres: user.user.address[0]?.addres || "",
    district: user.user.address[0]?.district || "",
    province: user.user.address[0]?.province || "",
    code: user.user.address[0]?.code || "",
    
  });

  useEffect(() => {
    // Set provinces data from imported JSON file
    setProvinces(provincesData);
  }, []);


  const getAddresFirst = async () => {
    amp = []
    for (let index = 0; index < provinces.length; index++) {
      if (address.province == provinces[index].name_th) {
        proviceID = provinces[index].id
        break
      }
    }
    for (let index = 0; index < amphuresData.length; index++) {
      if (amphuresData[index].province_id == proviceID) {
        amp.push(amphuresData[index].name_th)
      }
    }
    setAmphures(amp);
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };


  const loadData = async (authtoken, id) => {
    await readUsers(authtoken, id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadData(user.user.token, user.user.id)
    getAddresFirst()
  }, [user, address])


  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArray = []; // สร้าง array เพื่อเก็บข้อมูลรูปภาพทั้งหมด

      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            imagesArray.push(uri); // เพิ่ม URI ของรูปภาพลงใน array

            // ถ้าเรียบร้อยทั้งหมดแล้วค่อยทำการ setValues
            if (imagesArray.length === files.length) {
              setValues({ ...values, images: imagesArray });
            }
          },
          "base64"
        );
      }
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const handleInput = (e) => {
    const { value } = e.target;

    // ตรวจสอบว่าข้อมูลที่ป้อนเข้ามาไม่ใช่ตัวเลข
    if (/[0-9]/.test(value)) {
      // ถ้ามีตัวเลขในข้อมูล กำหนดค่ากลับเป็นค่าเดิม
      e.target.value = e.target.defaultValue;
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSave = () => {
    const userData = {
      firstName: name,
      lastName: lname,
      phone: phone,
      images: values, // You may want to handle file uploads differently
      address: address,
    };
    saveAddress(user.user.token, userData)
      .then(res => {
        console.log(res.data);
        if (res.data.ok) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            icon: 'success',
          })
        }
      })
  };


  return (
    <div className="py-20 bg-gray-300">
      <div className="h-screen w-screen flex justify-center items-center ">
        <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full py-10 ">
          <div className="flex flex-col items-center space-y-4">
            {values && values.images && values.images.length > 0 ? (
              values.images.map((c, index) => (
                <img
                  key={index}
                  src={c}
                  alt=""
                  className="w-50 h-50"
                />
              ))
            ) : (
              data && data.images && data.images.length > 0 && data.images[0] && data.images[0].images && data.images[0].images.length > 0 ? (
                <img
                  className="w-50 h-50"
                  src={data.images[0].images[0]}
                  alt=""
                />
              ) : (
                <img
                  className="w-50 h-50"
                  src="data:image/png;base64,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"
                  alt=""
                />
              )
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeFile}
              className="hidden"
              id="avatarInput"
            />
            <label
              htmlFor="avatarInput"
              className="cursor-pointer bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
            >
              เเก้ไขรูปภาพ
            </label>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-base font-medium">
                ชื่อ
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onInput={handleInput}
                id="name"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-base font-medium">
                นามสกุล
              </label>
              <input
                type="text"
                value={lname}
                onChange={handleLnameChange}
                onInput={handleInput}
                id="name"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className=" text-base font-medium">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={(e) => {
                  const isNumberKey = /^\d$/.test(e.key);
                  const isBackspace = e.key === 'Backspace';

                  if (!isNumberKey && !isBackspace) {
                    e.preventDefault();
                  }
                }}
                id="phone"
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className=" text-base font-medium">
                ที่อยู่
              </label>
              <input
                type="text"
                name="addres"
                value={address.addres}
                onChange={handleChangeAddress}
                id="address"
                placeholder="Addres"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className=" text-base font-medium">
                จังหวัด
              </label>
              <select
                id="province"
                name="province"
                className="w-full px-4 py-2 border rounded"
                onChange={handleChangeAddress} // เรียกใช้ handleProvinceChange เมื่อมีการเลือกจังหวัด
              >
                <option value={address.province} disabled selected>{address.province}</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.name_th}>
                    {province.name_th} ({province.name_en})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className=" text-base font-medium">
                เขต
              </label>
              <select
                id="district"
                name="district"
                className="w-full px-4 py-2 border rounded"
                onChange={handleChangeAddress} // เรียกใช้ handleProvinceChange เมื่อมีการเลือกจังหวัด
              >
                <option value={address.district} disabled selected>{address.district}</option>
                {amphures.map(amphures => (
                  <option value={amphures}>
                    {amphures}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className=" text-base font-medium">
                รหัสไปรษณี
              </label>
              <input
                type="text"
                name="code"
                value={address.code}
                onChange={handleChangeAddress}
                id="code"
                placeholder="Code"
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            
            <button
              className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded-md self-end"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
