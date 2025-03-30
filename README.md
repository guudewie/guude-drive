# guude-drive
file upload application with node js, prisma and cloudinary


## todo

✅  delete / 
✅ change files and folders
✅  make breadcrumzzzzz work
✅  problem: when changing item name to Z it'll appear at the bottom (how can we stay in position after rerendering?)
✅  adapt for mobile
✅  implement name checking for update/create File routes (same as already implemented for folders)
o  limit maximum upload
o  implement share functionality
     - give shared link a url query parameter with a unique code

Sharing Pseudocode

-> pass shareLink to view from main
     = "www.sharelink.com/example" -> render link- or share-request modal
     = "" -> render request form
               -> update share modal in backend
               -> redirect to main (?? How can we make modal keep open ??)