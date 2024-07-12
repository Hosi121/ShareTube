from flask import Flask, request, jsonify
import json
from services.embedding_service import create_embedding
from services.vector_db_service import save_to_vector_db

app = Flask(__name__)

# 仮のDB
with open('static/db.json', 'r') as f:
    db = json.load(f)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    top_k = int(request.args.get('top_k', 10))

    # 検索ロジック (仮)
    results = []
    for video in db['videos']:
        if query in video['title']:
            results.append(video)

    # 関連度スコアを仮で追加
    results = sorted(results, key=lambda x: x['likes'], reverse=True)[:top_k]
    response = [{'title': r['title'], 'score': r['likes']} for r in results]

    return jsonify(response)

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()

    # メタ情報からembedding作成ロジック
    embedding = create_embedding(data['title'] + data['description'])
    save_to_vector_db(embedding, data)

    # DBに保存 (仮)
    db['videos'].append(data)
    with open('static/db.json', 'w') as f:
        json.dump(db, f)

    return jsonify({'message': 'Video uploaded successfully'})

if __name__ == '__main__':
    app.run(debug=True)
