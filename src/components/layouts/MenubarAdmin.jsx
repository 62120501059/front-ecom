import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout as logoutRedux } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { readUsers } from "../function/users";
const MenubarAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const handleLogout = () => {
    dispatch(logoutRedux());
    navi("/");
  };

  const loadData = async (authtoken, id) => {
    await readUsers(authtoken, id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData(user.user.token, user.user.id);
  }, [user]);

  return (
    <aside className="flex flex-col w-80 bg-gray-800 h-full h-screen  items-center pt-5  space-y-7">
      <Link to="/">
        <p className="text-4xl text-white">Dashbord</p>
      </Link>
      <div className="w-full pr-3 flex flex-col gap-y-1  text-white fill-gray-500 text-sm">
        <div className="font-QuicksandMedium pl-4 text-gray-400/60 text-xs text-[11px] uppercase mb-5">
          <div
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
          >
            {data &&
            data.images &&
            data.images.length > 0 &&
            data.images[0] &&
            data.images[0].images &&
            data.images[0].images.length > 0 ? (
              <img
                className="w-10 h-10 rounded-full"
                src={data.images[0].images[0]}
                alt="Admin Image"
              />
            ) : (
              <img
                className="w-10 h-10 rounded-full"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABmFBMVEX////848PBUlL/z8pgOBOs3dn5v7v84b82N0D/zsr84sL/0s3//PnzfHz/6cj//Pj7pgD/+fIbHSr+9Oe/S00xMjz97dkpKjW9QkL98OBaMADCSEn+6M29REj/9+36ogC0sq/8y4n96tL93cXVVFRSKAD8xsEnNT/8yIH93bT90pr92av8wW7+1si1tbir5OD7uFT7skH8z5JQIQBWKgAAM0LR0dOqjo4iIy8XGSdRUln7qhz8vF/92q78w3SxlHbpz68AAADm5ueBgoZkZWvr6+zdnYzvxqyhS01xcne5UFFCOUH7sDp5VjfYvZ66j4LYrKOoimwALDzSRUXYZGRERU2KdXeRkZVaPUR+REify8jIamnZm5rt0dHmvr3frKzWkZCwxsPLfn6Wd1l+WzxsRiOYeVt7VD2WblqacV8AIDXFmY3NrKs0SFNNVl6KnKLPNjf3n532n53zg4PVwadWRUOyoY3NwrgACiKGbXAAByPotqDUiHuaSkzIZ2KIsrDH2dVqeHyBmZrYkYKIO0C7fn2+aGe7gX+d7z4rAAAWpklEQVR4nO2di1cTSfbHOyB0ku7tpPMkISaTKIEExAQQggFFJD4R308kuIysrqKz67j7c3/j6uzM/tx/+1fVXdXvTroeQfYcvsfjCSEk/cm9de+tW93VgnCsYx3rWMc61tFSsVhUwf9q7HsfCFepGXFVUJub7aaQjLfbDSED/l8RKs0L5Sj47fc+PCbJlelyTI63G1OCIBZyACamGS+mAiOq4mp5WhBL7UZNkP8bbZqsqUKzPVPv97pYrlYR6qXmVO4wjoqf6sAbkwSvL4bmcsLUlPhf4bO5enNayFVk8r/M1Jvx4lEfmDEhVJoR6UeVKsRKzTqJ9Q9V6nRzs89LZF09XyKurBzV0AOiouexy2oxl6kUQkCiLviwUMnkiqoPbC0+lRnkoVKotlkQPL53NZcpQKxoNBpyCjwHYQuZnMfQy5VL4uCPOrgK8WbN+VwsmdHYXGQuUvCqQibp8f00pini1QCk1oRiwfFcEdL1h7NhhjJFx7sUGvG++XTwis3FZ+zPyMkCGZ1JGa04wmgB1HvfO+isrNhDAi2eYcqCA3IuvnqIOE7VHNFArehxkkUAMmMLPYW+OWhgyjXaFevPyRCD9eyQIZshwSh3DtHDUcMaBuRMlNl8FonRjDWOVkqHH3JCNvPFKpzMZyoqZiwxBvjL4WaO2IW4JUEMgE9nrFgYo4dL2Fgxg4GcGQifzmj11crmoVVyqnWKkxsYn85omRlPH1IBkNwsW34I8YwvXhJDZhzNrRwGYCg+ZzyOFQbNpzEWLK6aqXgcE1/VQsbDwTqoKaurFgacN9Rp8/HhGFCXWDCiaq5d9joyTkpumlV27vD4NEbDjKpzIsNRqjkE5UM0IEK0gA2s9RgzhmDRY84+aEWjRo6ajg/Ejqvmux6yh2KZniqWBlCK1+PG+1e+DyBANFJFjn8NtxrHExo5dPgeihUNGWQF3hNjo7+gfj8+jREPxlx82u9YaWQuKBS/l4diiXgE5uIc+431OCZMfm9AgIi9KccvZ0wbY/A7BVG7zJCa5FWk1vG8LHMUAC2ImRLnvHhEAC2IYpyDpyZL2EWPDKAFcdq1mkAsdRPPVo7EGMQS+UWZMp5NDCCKKgr4p9D9rRFRVy8wEuI0wT8PKls/3jqx//LiGh0jzotqm2lKXMHOoHIHFG/N50+cOJHPz7+kY8RVSK7E4LHJOEo4MvdSLboP+TTl5y9SIeIOaoX+5AZ5E894efOFlJcGINDEj3SealiCltBo3hU4m1ARb1kBT5xYeEmDGMUlTZO1O0WTJxQlura2tbW2FnWHS2UrbwcEiH+iQcQ5Ixen6oaruKdFHkYVZevurfz8BNB8fv/Hi1uiiQl+93L+hEt0YxFHm+kGDeEM8lHyKKNs7c9bjJTPL8xDzDUxKq5t3d334INjkSpaR7EVKADFNvp+SAehsnZrwg2QX5iYWFhYmFhw+qfxAio/jeLSO0nOWEeRinQQKlsefEE0sUZBaAzFWpvCippixIDeTthfC3RZEZ9FRxpPc7gJUiD8wDVawBN5qowRCiE/zcXJCPE3Quyjt2gBgSgLVOSnZAOxhk7wIPdRykGoGZGyrhBR9aaSVG9TyPTEcZTFhAuU1T2OpyLFeTfEc0L6UQhtSDt/wROpzcBNYhWHJdKPUrYWWAgpAUO4BA8FDjZlVM0Q16PKRb98HkT7lNN9M9gE7bwVUQNLJq9HWQjpihqEiIJNwPMY51BrJkNekLIQTmxRA4aiaG4xE2wtI6Z/IYSZQlHEtSjLOGQYhoYRC4HODcMT5gqJCeGUCIie70SermhDwpPhRhAjljLkJlQuzrPEGKh5tl4XKk8zARIGnkwSmZC63Da1sMViQ2MkBlBbX5UjCqTKj6wWBF5K2Y3CQouJyam+hKi9RhRIFVb7wS+IPh1qQkaMBV6rIRoVUZY0mJ94ded1nnYGbDkI/cCn+hhRRasAZOXMWu8k4c2fB1qYWHh9uytJdybY8iEUWsnoN0+so4KN7M39CQHD/qtXr/a19v0E0vxE/gR49vXtt3eqEtDwsASMSDnHN4Vqtj51zaZexBI2EH0JJ17fGZZ0DUNVobRH1mfBT8CI+buMhMZCRi9AbGKiVOE7DvO3ugZDZNgmx4/D0j5TXaofBYo1vc+XQl8D6dTeG/CVwddX0u08MyFOGCu96hoESDrzVV56Ee4HxdP8d541IRqxRmz6A2aQk5I22JS7Hm46cSewBaERX7HbEBWnco98Maf/jnhi6DW3z/+ZBBC46QQzYaj/SVIokpIv2Xv0ZyaqJIDDUpdyndRGqLup6jsQ5RU0yyJv6+27TPg6iAktKUPKs5XeUMhNk/F+fUXyeYy79A40CqXuo/fv3i9pr5ReM9Y0GqLNF90q6OgUp10oF50DMS85Ux6ymPXnpXvngN7oP7zlcDIE6iuW/WINWkkl78+4B6KXk0oHS0tLBxZGCeDdO3dvQ3smMswOiJO+6nNGXwYtUNG8teIYiPm3LkLpHbTYvXddiw3PPeoOR9ArIxwIQ37uqWtar7pJ1yp0QkdGnOi6CCNvoEueu7dkMaLVayOnOACijlTZu3Ma0k1Md3qXY0km7xFWlq4vHSy9f+8enzwJ9XxR7nldDc0wBLLb8JVHJLVPJ9yEZzgQooEoep65EJujH4bATf9kRQyWDR3iQYgmicWSF2EBLU5RBm1buy1/Ozih8UqJByEq3DwnUNN6A4P2HD1bNCUglJaM8o4LYY9yBvX8c5Qrsbakv+BOFojHOQ6lg58W0cMIj3PLUKipz3kQFoosgUab6OdhFwa2Bhd8ajbp4J4jjUhLP/3U5UiIQk2tx/W0pHNDQ8rd/bfdarV75/ariXk/wsvCZQfhwZs3CJpLukChJuOx4l1Ea2r0X+SpiNY2A+q+8iO8/tM553Pn3qAMyYdQr2rUuHsRqqDXbOTLoiagkct9k5609OaNI+NLXVzk8CFEVY3HKltNtyH1+dxRv1rFpsi5d0568HVUq9UIN0I9mHp0TVEHg/qU/DOBCKWuUXibTdRRqCovQj1gXnAvsxX139Ami1AQPhvr0vsNLcRERnVF+BBG9YZw2StdaKJNFn2cFNvJ5p1L58xfgV9yItTTxbR7Eox2QyLsdgcjxGYaHbWb8d0BNCL+FSdCffYbdV9o0tYJadNhT0ID0GHF9wemm3LK+MYCjUtyWx+HtO/bi7BqEtqM2N2wrWpwIkTTfFftraIOHPX79jChL6E9cfBpYyDCpHsZEa1JUb9vj2wR8fFSLAzKk7DY9ltHpH7fU4Hc1AYOVa1KOx/QkiJPQrXtnEYV9VKVqg2lq9eMsGpaUIoAtCrIFTs7O6q292X3Lxo4ly6GQRhrOm2YYS1LexoRHL9WmAHWD6rjXN7R+/e5Eoo+J36xEwar26p/2bMdgbx3/zQi5DO1wISutW4OhIEQpdOn7z/v4E/tPL9/Gki3MqdkoRPG4u50wU4YBFH6GSDef/Bit9vdffHgvgb4QF+a4QOICds+q/lshNY5oh/hqAYFKO/reODhB62y4RVoMCH/WKopekZPAv6g0gOd68GDPyA9qPIchjiWutYQi+jcU/YPOHXqDJQfozR62mDT9Vd97Yn9k5G8vRNkyBgnQiR/I/7VDvgH/WleTooJXTmDuS51yj89Sj/bAPWChp+TorrUfS0bcltun9OjFJc+mHw/V1Erkd8HaxwVdzsRWZW6XerSmR6Io9iMH3Ctx89J9flhyH3aUFOfG9PO8d06M+qPOCxVRz98GB01T3vj5qSoixFyN70b+qoNdVPfpVPeUyWD0baEwSvd9zrhe4ptYcbjo0ZHAzUY+ZoQ99o8duxHqzUctzAZDY7Iz4S4X+p/9QzHPUyqgRE5mhD3vJseiZ9H6W2T1mILgsitJIVCkyePU/bx0je/LTDOjAZF5PaRUDrGpnscymjLMn4J8VSP5pPNhFz3FelxDWITrS3ySxeRQIg8B6GRLIpes8MpPSFyTBcR3IHq4amRYa6AQU4Z4rhfUsRolfqaMSJx3voGhdIVz13OUDHAh1D5+PGj3lzzZ4xIEl8DhozzadpelU2xxGsODBVtXbqE5kXG6pmdD1RtSx+ZTwt2CgUa7y3O2vSnl7qkbKTTl/C6hNHVr1q6G9Lbv2WzYd6EvS9DRLeB41K3JRcT4UvmyotlbUa7MAj8XL15KZx9rHL4LKtQoHHeygUJ7VvL2oyC+jgrbKSz1rUl6/qTTvq3dDgsrP+drxVRReO+OZNN7J8Thce+nD5vW8qouggTi8JGgvGqQ6d0I7nbwbpExvO+sKKddOux8LiVXbKv1tgYd7PZ68JsIrHIBQx/Mpr++m04hC6JYp1eKB+F2dbyunA+3XKeC21ZSQynW4KQzj4W/oejnyIb5fxKt1U082ckXPu0KDxMnxfWEw4/tRiy+g/oo5ezWaHziWPKiPqQYSVLes+UbYs95Xz2vLC4DPx0NuH0U92QAHK3lb0sLCZas4AyzYsPn4eh+l/ahe7ux5YvkrNZcODXs4l1YSPr8lM9F0bC6YeCkAX/LSbS13lEb00oV9T67k/HMgtWPq4L6TRwvhY4fDnt5aeA8FEWjNON9PIiGKzLHYFXyuh/iaWM4OnniEooDSIkdMFZ3Q+9/FQ6aAErm696/L9rtFvR2oQ3xyj12AuzXWBwU3CUV698mwTWCWupLr08C1OG20+lcHYDumdY6CTCiY6cnfzn71ej7JB4591em33iS6Ioru1Srl7ZTp1MpZ5ObgDLABfttMKtjgDCjut0y0fZtAC+hWX4LYB08Tj7JJU6efLLlavUuwojQuSJvUYgvvSJrPOtKNFfPg8BuiGocAKOLuiBCY3T6afSQQKwXc8CttlWOC10lidvaH8Ivp/Pv5yih8SXdcV7XpGP1mcIkr6irF35Ag5uCOufkzBChnUKyOmMp2EtkSArg6g7+dT4W2BLzZRUhGjyu9onkiIfDox39coXC52mJ1qWA9YBQRWm9ZbNT6VHLVgMhBOw6EnDzHnT/uepk0O/U0GiQqZP1a2iy/WD7IsBrTfkxAO6MdkSZEAIoskyCCTCw5b1crWDRBY8lU6AKJSFhn44ec31DlSQKM7EGn02UlpBe7X1I4Rjz2U9pKdaGgi3foAh5zwImNZ4argvwNde98TzPaC7niJi7FexYaFT9vtMMIB3fk5540GFtVQeNgLKsuGn0qNlPAiz4TAsDFCY8YTc/iUUGBLFGbn/NkplPRL1qmuUqKd3moLBZn05HNaSAhyKy8hPpYPlDTgIYRpJhxOwuHva432gtwYNrihVrPbYUMEhv4TRx3y6nsD5oTYUEU4C+SkwGxiEy4taKNpwhxkPyM9XgyDiBs1mgFuzlHvt9QX4tnuaT9eNSRhh0igvwKGo+an06BN0XPgssDAgD3uEGTfjl1/62xHt9eU797URzvgbUbnqF10cejp5XvNTvXADYeXSgTQsdS/B4JPVLAt99HLWO8w4BRn7mBCVpGqQ7dlVtDDlNiLkC3REQDdbkA0gwjkUTA3wpPUI9Es4bwqnw9nr4LF/mCFk9L8WyNOI3tt9Kac+B7OfpmuTWkrX5oFg4K0LsFMa6YD5FEiHG2kQhWQhPdkrzLgYe4xHPAobZLcssYVTRblCwAf0RBt+YTiNAHPFcAfGmYiqzQk128IB2S/MOBg/R/0YkQkrvUtSCxpKnpbCRrk6RMQHg00WBZTHwB2z/9AizVILOCx6cjYRIMzYlEr5uCrev7QRdMdrFW2daFanyu+BB6Chp5N6UoAhZfbT4x0tHX6Cs2LgoiAOtdLBwoxVfmZEBz4V+H5zc6jphmbCiviF0ICaboa1CjQMp1OXv54dGfn110XguVnwjPaLwGHGotSQx2gUyXecl/HdFLSuG7mH6ro2iYYiBHo2oknQkDXjkoQZi066PNXYC5okzCTxrrXAiMov5B6q60k4i5zyYUcHHOlcz6JBGCYLMxbEKw5EnCnaQWtvXXh3N5EeEAQbOAZh5Mz+66xO+Bv84TrEJg0zvog4zJR7XL7toWIJ3/vhKjUgDDZwogvMlv0N2fBrFmZIGWR88jBjItocFXfwVwjvNjOFajd1jP5IYLBJg8x+Pp39igiftdJpbV5BE2ZMREu4EQOmQJdi+EZIu+MMh3JtEiYGOdxCgWZkBBoVpBDKMGPI5aNR8rvo5fC57ttUgRTpiTbs1pfRMBw5+04vaWjDDFIKD0UMVqS6fy7KMh0WPwXBBobOdWzCkV+1koY+zGBEVDPj8NmgupU12lFY2GFBBMEGBNSOSbgIAFnCDCL8XTMi3slEprpXkBDFF2U8ZxmKNwFQ4qtB+Ay4aDjMEmZ0nRQtg5BaF/BZKSxD8Rr0UyPQjIwAQtYwAwWNaNyza4o2nhpLHDLLsYBgkzYBR96nWcOMrpNRs+Cm81EdETGyRJsbk+n3Z03Cf6WZw4wmYERUWop+Z14EUQgPRZZo89So2bS6LWBvpq/GcDoTaRKFoSncfuwyIN78zeKlX1vsYUYD7LJwWdTAo3mXHvHaVwvhyL/5AO6i4/I+z5JKz6kRx/5oJWRJPeZbPkdHVW6y30e+jrvIL2gRx7kTGoAFliiDVcA1ODXi+A8WwGccCA1AQeUAKAg144JTSsTxA0ss/SM7oQFY4XVbbnMKRjcWx5e4EhqAmXiAZZiAymBnoIqoqds8CY0omowHuzNQINWNa79p8mLq/yyEPzASmnkwyD1lgqtsXMBPUd2kvvEjHN9Bx+F5zQiL5ozNhzvk3dNtXoSpIbzhRC7ee8tgGhmBWd4mPcgbnAjH9vDBVHiOQayQkRfJQ+oIF0IzDQp1frWaRbWSEZx3xog8NcWDMGUMwd53IWFRwdzHTiXy1PFn7IRj20YBWia8qSoZpPExJJlxjJ3QyIJgNtHkHUatWmkaW4bsDAU+VmvpTUU4/sXwUEENvkpIpam4uTzwPOhoZCRMWQwYGtgYNCRaFkA628Fc1Tq5IK/axrbXLV8w1X3iCVWcMTe36aaCHDAL4XjK0q4Y7BA0dcFS08tBXHX8h7OUhClLDhSMi0AHr5B1m6nOXl9G6/SJhDA19sLYFkxQ6dYmqGW9ScZ6P0Y6wtTYnjkABTFO39mmUjG+Ytlqqg9jykIYtIth5wN1Gv9Ku4/kqZJ1N63OizH/Q0/9x1J6ByIcHzO3rQOaC3oqEF8lBdk68uXdIT9DEhKmxm7sWrN6tN0gXKPnJjXesEW3nT1vQ1on+Wf7hKXU+Njejv1jyvzaMeSql+yfLne3x8ZdDDbCXk19gPetayvKMoHPVRuUwFics2epzu43J6S1jXH2W0+8ju29Yivx+uFGUE+V4zOOTCx3XwxZKW2Ee15uCuiGXnQdJXVFlqf73V/scKTOld1n565DSoxpadSc/U/KBQfpOs43qDUD3/j2UFSO193xrrOzu7c9BjgtjZqztxFhKjUO2Ma393Z3XHTgC5veHEijgkGFmZLPV97Z6e6ayeLskmbZG9t7L3a7HmxAsVqDYd16gFIFuT3VfyVB7shyzzmsHG+uHo3h56Hc3OamcV4jhVQResKRxdMVE0KlhseY7Cu5khSmmvUjFV38VKzN1ASxXiHJZIVGu33UQksfFS5slgpCKNTXmmp9ZnNGSK5+r9KTRbDeabbBwJqr18DcR1VjRoRRk5WCoE6ttJtC7sI0kbWPnoqCMF2GXch2ux2Xtf9Byd7ebAixulg54lGFTLIKV8SSRfj/YFuexzrWsY51rGMR6v8Bh0M+aG+zqAgAAAAASUVORK5CYII="
                alt="Admin Image"
              />
            )}
            <div className="pl-3">
              <div className="text-base font-semibold">{user.user.name}</div>
              <div className="font-normal text-white">{user.user.email}</div>
            </div>
          </div>
        </div>
        {user.user.role === "admin" ? (
          <>
            <Link to="/admin/index">
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href="#"
                >
                  <svg
                    className="h-5 w-5 group-hover:fill-white dark:fill-gray-600  transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                    />
                  </svg>
                  <span className="font-abc text-lg">การจัดการ</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/manage-admin">
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href="#"
                >
                  <svg
                    className="h-5 w-5 group-hover:fill-white dark:fill-gray-600  transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z" />
                  </svg>
                  <span className="font-abc text-lg">จัดการผู้ใช้งาน</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/create-category">
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href="#"
                >
                  <svg
                    className=" h-5 w-5 group-hover:fill-white dark:fill-gray-600  transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                  </svg>

                  <span className="font-abc text-lg">จัดการหมวดหมู่สินค้า</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/create-product">
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href="#"
                >
                  <svg
                    className=" h-5 w-5 group-hover:fill-white dark:fill-gray-600  transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                  </svg>

                  <span className="font-abc text-lg">เพิ่มสินค้า</span>
                </div>
              </div>
            </Link>
            <Link to="/admin/list-product">
              <div className="w-full flex items-center gap-x-1.5 group select-none">
                <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
                </div>
                <div
                  className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                  href="#"
                >
                  <svg
                    className=" h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                  </svg>

                  <span className="font-abc text-lg">จัดการข้อมูลสินค้า</span>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/admin/index">
            <div className="w-full flex items-center gap-x-1.5 group select-none">
              <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
              </div>
              <div
                className="group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
                href="#"
              >
                <svg
                  className="h-5 w-5 group-hover:fill-white dark:fill-gray-600  transition-colors duration-200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />{" "}
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                <span className="font-abc text-lg">การจัดการ</span>
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm">
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700 ">
          <div className="w-full flex items-center gap-x-1.5 group select-none">
            <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
            </div>
            <div
              className=" group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-white dark:hover:text-white text-sm"
              href="#"
            >
              <svg
                className=" text-red-500 h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600  transition-colors duration-200"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>

              <span className="font-abc text-lg text-white hover:text">
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MenubarAdmin;
