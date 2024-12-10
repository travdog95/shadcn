// import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";

// const DialogDemo = () => (
//   <Dialog.Root>
//     <Dialog.Trigger asChild>
//       <button className="Button violet">Edit profile</button>
//     </Dialog.Trigger>
//     <Dialog.Portal>
//       <Dialog.Overlay className="DialogOverlay" />
//       <Dialog.Content className="DialogContent">
//         <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
//         <Dialog.Description className="DialogDescription">
//           Make changes to your profile here. Click save when you're done.
//         </Dialog.Description>
//         <fieldset className="Fieldset">
//           <label className="Label" htmlFor="name">
//             Name
//           </label>
//           <input className="Input" id="name" defaultValue="Pedro Duarte" />
//         </fieldset>
//         <fieldset className="Fieldset">
//           <label className="Label" htmlFor="username">
//             Username
//           </label>
//           <input className="Input" id="username" defaultValue="@peduarte" />
//         </fieldset>
//         <div
//           style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
//         >
//           <Dialog.Close asChild>
//             <button className="Button green">Save changes</button>
//           </Dialog.Close>
//         </div>
//         <Dialog.Close asChild>
//           <button className="IconButton" aria-label="Close">
//             <Cross2Icon />
//           </button>
//         </Dialog.Close>
//       </Dialog.Content>
//     </Dialog.Portal>
//   </Dialog.Root>
// );

// export default DialogDemo;

import {
  ICellRendererComp,
  ICellRendererParams,
} from "@ag-grid-community/core";

export class CompanyLogoRenderer implements ICellRendererComp {
  eGui!: HTMLSpanElement;

  // Optional: Params for rendering. The same params that are passed to the cellRenderer function.
  init(params: ICellRendererParams) {
    let companyLogo: HTMLImageElement = document.createElement("img");
    companyLogo.src = `https://www.ag-grid.com/example-assets/software-company-logos/${params.value.toLowerCase()}.svg`;
    companyLogo.setAttribute("class", "logo");

    this.eGui = document.createElement("span");
    this.eGui.setAttribute("class", "imgSpanLogo");
    this.eGui.appendChild(companyLogo);
  }

  // Required: Return the DOM element of the component, this is what the grid puts into the cell
  getGui() {
    return this.eGui;
  }

  // Required: Get the cell to refresh.
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
