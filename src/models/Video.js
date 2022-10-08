//video모델 만들기 = momgoose와 database에게 우리의 데이터가 어떻게 생겼는지 알려주기
//ㄴ database의 관점에서 data가 어떻게 생겼는지 알려주기 : 우리의 데이터는 title이 있는데 string 값을 가질거야
//ㄴ 이렇게 알려주면 database는 우리가 데이터를 추가할 때 마다 data 형식을 유지하도록 할 수 있음.

import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 2 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

//schema = model의 형태와 data의 타입을 정의
// title: String === title: {type: String}

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});
// ↱ model의 이름
const Video = mongoose.model("Video", videoSchema);
export default Video;
